import {
  memo,
  useRef,
  forwardRef,
  useImperativeHandle
} from 'react'
import { useMap } from './Map'
import ArcTileLayer from '@arcgis/core/layers/TileLayer'
import usePrevious from './hooks/usePrevious'
import { getPropsDiffs } from './utils/getPropsDiffs'
import { useEffectOnce, useUpdateEffect } from 'usehooks-ts'

type Props = NonNullable<ConstructorParameters<typeof ArcTileLayer>[0]>
export const TileLayer = memo(forwardRef<ArcTileLayer | undefined, Props>((props, ref) => {
  const innerRef = useRef<ArcTileLayer>(new ArcTileLayer({ ...props }))
  const prevProps = usePrevious<Props>({ ...props })
  const map = useMap()
  useImperativeHandle(ref, () => innerRef.current, [])
  useEffectOnce(() => {
    map.layers.add(innerRef.current)
    return () => {
      innerRef.current.destroy()
    }
  })
  useUpdateEffect(() => {
    const diffs = getPropsDiffs(prevProps, props)
    diffs.forEach((key) => {
      // @ts-ignore
      innerRef.current.set(key, props[key])
    })
  }, [props])
  return null
}))
