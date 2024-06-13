import {
  forwardRef,
  useRef,
  useImperativeHandle,
  memo
} from 'react'
import ArcGraphic from '@arcgis/core/Graphic'
import { useEffectOnce, useUpdateEffect } from 'usehooks-ts'
import { getPropsDiffs } from './utils/getPropsDiffs'
import usePrevious from './hooks/usePrevious'
import { useMapView } from './MapView'

type MapGraphicProps = NonNullable<ConstructorParameters<typeof ArcGraphic>[0]>

export const Graphic = memo(forwardRef<ArcGraphic | undefined, MapGraphicProps>((props, forwardedRef) => {
  const innerRef = useRef(new ArcGraphic({ ...props }))
  const prevProps = usePrevious(props)
  const mapView = useMapView()
  useImperativeHandle(forwardedRef, () => innerRef.current, [])
  useEffectOnce(() => {
    const diffs = getPropsDiffs(innerRef.current, props)
    diffs.forEach((key) => {
      innerRef.current.set(key, props[key])
    })
  })
  useEffectOnce(() => {
    mapView.graphics.add(innerRef.current)
    return () => {
      mapView.graphics.remove(innerRef.current)
    }
  })
  useUpdateEffect(() => {
    const diffs = getPropsDiffs(prevProps, props)
    diffs.forEach((key) => {
      innerRef.current.set(key, props[key])
    })
  }, [props])
  return null
}))
