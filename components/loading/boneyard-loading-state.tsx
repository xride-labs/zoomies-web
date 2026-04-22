'use client'

import type { ReactNode } from 'react'
import { Skeleton as BoneyardSkeleton } from 'boneyard-js/react'
import * as bonesRegistry from '@/bones/registry'

type RawBone =
    | [number, number, number, number, (number | string)?, boolean?]
    | {
        x: number
        y: number
        w: number
        h: number
        r?: number | string
        c?: boolean
    }

interface BonesDescriptor {
    width: number
    height: number
    bones: RawBone[]
}

interface ResponsiveBonesDescriptor {
    breakpoints: Record<string, BonesDescriptor>
}

interface BoneyardLoadingStateProps {
    name: string
    fallback?: ReactNode
}

function normalizeBone(raw: RawBone) {
    if (Array.isArray(raw)) {
        const [x, y, w, h, r = 0, c = false] = raw
        return { x, y, w, h, r, c }
    }

    return {
        x: raw.x,
        y: raw.y,
        w: raw.w,
        h: raw.h,
        r: raw.r ?? 0,
        c: raw.c ?? false,
    }
}

function isResponsiveBonesDescriptor(value: unknown): value is ResponsiveBonesDescriptor {
    return !!value && typeof value === 'object' && 'breakpoints' in value
}

function renderDescriptorFallback(name: string, descriptor: BonesDescriptor) {
    const bones = descriptor.bones.map(normalizeBone).filter((bone) => !bone.c)

    return (
        <div
            aria-hidden="true"
            className="relative w-full overflow-hidden"
            style={{ height: `${descriptor.height}px` }}
        >
            {bones.map((bone, index) => (
                <div
                    key={`${name}-fallback-${index}`}
                    className="absolute animate-pulse bg-[#eceff3] dark:bg-[#2a2f36]"
                    style={{
                        left: `${bone.x}%`,
                        top: `${bone.y}px`,
                        width: `${bone.w}%`,
                        height: `${bone.h}px`,
                        borderRadius:
                            typeof bone.r === 'string'
                                ? bone.r
                                : `${Math.max(Number(bone.r) || 0, 4)}px`,
                    }}
                />
            ))}
        </div>
    )
}

function getGeneratedEntry(name: string): unknown {
    const generatedMap = (bonesRegistry as { generatedBones?: Record<string, unknown> }).generatedBones
    return generatedMap?.[name]
}

function getFallbackDescriptor(name: string): BonesDescriptor | null {
    const entry = getGeneratedEntry(name)
    if (!entry) return null

    if (isResponsiveBonesDescriptor(entry)) {
        const breakpoints = entry.breakpoints as Record<string, BonesDescriptor>
        return breakpoints['375'] || Object.values(breakpoints)[0] || null
    }

    return entry as BonesDescriptor
}

function BoneyardInstantFallback({ name }: { name: string }) {
    const entry = getGeneratedEntry(name)

    if (isResponsiveBonesDescriptor(entry)) {
        const breakpoints = entry.breakpoints
        const mobileDescriptor = breakpoints['375'] || Object.values(breakpoints)[0] || null
        const tabletDescriptor = breakpoints['768'] || mobileDescriptor
        const desktopDescriptor = breakpoints['1280'] || tabletDescriptor || mobileDescriptor

        if (mobileDescriptor && tabletDescriptor && desktopDescriptor) {
            return (
                <>
                    <div className="block md:hidden">
                        {renderDescriptorFallback(name, mobileDescriptor)}
                    </div>
                    <div className="hidden md:block xl:hidden">
                        {renderDescriptorFallback(name, tabletDescriptor)}
                    </div>
                    <div className="hidden xl:block">
                        {renderDescriptorFallback(name, desktopDescriptor)}
                    </div>
                </>
            )
        }
    }

    const descriptor = getFallbackDescriptor(name)

    if (!descriptor) {
        return (
            <div
                aria-hidden="true"
                className="h-24 w-full animate-pulse rounded-md bg-[#eceff3] dark:bg-[#2a2f36]"
            />
        )
    }

    return renderDescriptorFallback(name, descriptor)
}

export function BoneyardLoadingState({
    name,
    fallback,
}: BoneyardLoadingStateProps) {
    const generatedFallback = <BoneyardInstantFallback name={name} />
    const fixtureContent = fallback ?? generatedFallback

    return (
        <BoneyardSkeleton
            name={name}
            loading
            initialBones={getGeneratedEntry(name) as any}
            fallback={generatedFallback}
            fixture={fixtureContent}
        >
            {generatedFallback}
        </BoneyardSkeleton>
    )
}
