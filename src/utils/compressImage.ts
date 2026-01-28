interface CompressOptions {
  maxWidth?: number
  maxHeight?: number
  quality?: number
}

const DEFAULT_OPTIONS: Required<CompressOptions> = {
  maxWidth: 1920,
  maxHeight: 1920,
  quality: 0.8,
}

/**
 * Compresses an image file by resizing and reducing quality.
 *
 * @param file - The image file to compress
 * @param options - Compression options
 * @returns A promise that resolves to the compressed file
 */
export async function compressImage(
  file: File,
  options: CompressOptions = {}
): Promise<File> {
  const { maxWidth, maxHeight, quality } = { ...DEFAULT_OPTIONS, ...options }

  // Validate file type
  if (!file.type.startsWith('image/')) {
    throw new Error('Invalid file type. Only images are supported.')
  }

  // Create image element to load the file
  const image = await loadImage(file)

  // Calculate new dimensions
  const { width, height } = calculateDimensions(
    image.width,
    image.height,
    maxWidth,
    maxHeight
  )

  // If image is already small enough and is JPEG, return original
  if (width === image.width && height === image.height && file.type === 'image/jpeg') {
    return file
  }

  // Create canvas and draw resized image
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height

  const ctx = canvas.getContext('2d')
  if (!ctx) {
    throw new Error('Failed to get canvas context.')
  }

  ctx.drawImage(image, 0, 0, width, height)

  // Convert to blob
  const blob = await canvasToBlob(canvas, 'image/jpeg', quality)

  // Create new file with same name but .jpg extension
  const fileName = file.name.replace(/\.[^/.]+$/, '.jpg')
  return new File([blob], fileName, { type: 'image/jpeg' })
}

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    const url = URL.createObjectURL(file)

    image.onload = () => {
      URL.revokeObjectURL(url)
      resolve(image)
    }

    image.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('Failed to load image.'))
    }

    image.src = url
  })
}

function calculateDimensions(
  originalWidth: number,
  originalHeight: number,
  maxWidth: number,
  maxHeight: number
): { width: number; height: number } {
  let width = originalWidth
  let height = originalHeight

  // Scale down if width exceeds max
  if (width > maxWidth) {
    height = Math.round((height * maxWidth) / width)
    width = maxWidth
  }

  // Scale down if height still exceeds max
  if (height > maxHeight) {
    width = Math.round((width * maxHeight) / height)
    height = maxHeight
  }

  return { width, height }
}

function canvasToBlob(
  canvas: HTMLCanvasElement,
  type: string,
  quality: number
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob)
        } else {
          reject(new Error('Failed to convert canvas to blob.'))
        }
      },
      type,
      quality
    )
  })
}
