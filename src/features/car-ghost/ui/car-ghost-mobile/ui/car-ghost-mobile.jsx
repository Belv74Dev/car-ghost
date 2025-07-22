import { useState } from 'react'
import { TouchButton } from '../../../../../shared/buttons'
import { useLongPress } from '../model/useLongPress'
import style from './style.module.css'

export const CarGhostMobile = () => {
    const [viewGhost, setViewGhost] = useState(false)

    const onLongPress = () => {
        setViewGhost(true)
    }

    const defaultOptions = {
        shouldPreventDefault: true,
        delay: 500,
    }

    const longPressHandlers = useLongPress(onLongPress, () => { }, defaultOptions);

    return (
        <div className={style.carGhostMobile}>
            {viewGhost
                ? (
                    <>
                        <div className={style.carGhostMobile__ghost} />
                        <div className={style.carGhostMobile__glitch} />
                    </>
                )
                : (
                    <div className={style.carGhostMobile__touchButton}>
                        <TouchButton {...longPressHandlers} />
                    </div>
                )
            }
        </div>
    )
}