"use client"

import React from 'react'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from './avatar'

interface UserAvatarProps {
    src?: string | null
    name?: string | null
    fallbackText?: string
    className?: string
    imgClassName?: string
    fallbackClassName?: string
}

const UserAvatar: React.FC<UserAvatarProps> = ({
    src,
    name,
    fallbackText,
    className = '',
    imgClassName = '',
    fallbackClassName = '',
}) => {
    const [imageError, setImageError] = React.useState(false)

    // Generate fallback text from name (if available) or use provided fallback
    const getFallbackText = () => {
        if (fallbackText) return fallbackText
        if (!name) return '?'
        return name.substring(0, 2).toUpperCase()
    }

    // Determine if we should use local caching for external images
    const getImageSrc = () => {
        if (!src) return null

        // For Google profile images, use Next.js Image component with unoptimized to bypass
        // the optimization that's causing timeouts
        if (src.includes('googleusercontent.com')) {
            return null // We'll handle Google images separately
        }

        return src
    }

    const imageSrc = getImageSrc()
    const isGoogleImage = src?.includes('googleusercontent.com')

    return (
        <Avatar className={className}>
            {/* If it's a Google image, use Next.js Image with unoptimized */}
            {isGoogleImage && !imageError && src ? (
                <div className="relative h-full w-full">
                    <Image
                        src={src}
                        alt={name || 'User avatar'}
                        fill
                        className={imgClassName}
                        unoptimized={true} // Key setting to bypass Next.js image optimization
                        onError={() => setImageError(true)}
                    />
                </div>
            ) : (
                <>
                    {/* For other images, use AvatarImage which includes our error handling */}
                    {imageSrc && !imageError && (
                        <AvatarImage
                            src={imageSrc}
                            className={imgClassName}
                            onError={() => setImageError(true)}
                        />
                    )}
                </>
            )}

            {/* Always render fallback, it will be hidden if image loads successfully */}
            <AvatarFallback className={fallbackClassName}>
                {getFallbackText()}
            </AvatarFallback>
        </Avatar>
    )
}

export default UserAvatar