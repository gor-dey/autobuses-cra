import ArcVectorTileLayer from "@arcgis/core/layers/VectorTileLayer"
import {
    forwardRef,
    memo,
    useImperativeHandle,
    useRef
} from "react";
import usePrevious from "./hooks/usePrevious";
import {useMap} from "./Map";
import {useEffectOnce, useUpdateEffect} from "usehooks-ts";
import {getPropsDiffs} from "./utils/getPropsDiffs";

type Props = NonNullable<ConstructorParameters<typeof ArcVectorTileLayer>[0]>
export const VectorTileLayer = memo(forwardRef<ArcVectorTileLayer | undefined, Props>((props, ref) => {
    const innerRef = useRef<ArcVectorTileLayer>(new ArcVectorTileLayer({ ...props }))
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
            innerRef.current.set(key, props[key])
        })
    }, [props])
    return null
}))