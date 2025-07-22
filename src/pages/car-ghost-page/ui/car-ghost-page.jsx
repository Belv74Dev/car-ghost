import { CarGhost } from './../../../features/car-ghost'
import { useWindowSize } from '../model/useWindowSize';

export const CarGhostPage = () => {
    const [width, _] = useWindowSize()
    return (
        <CarGhost isMobile={width < 1024} />
    )
}