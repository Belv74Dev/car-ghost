import style from './style.module.css'

export const TouchButton = (props) => {
    return (
        <button
            className={style.touchButton}
            {...props}
        >
            <div className={style.touchButton__icon}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M1.565 11.91A15.03 15.03 0 0 1 11.909 1.564M30.435 20.09a15.03 15.03 0 0 1-10.344 10.344M31 16c0-8.284-6.716-15-15-15m0 30C7.716 31 1 24.284 1 16M20.09 24.627a9.584 9.584 0 0 0 4.537-4.536M25.546 16A9.545 9.545 0 1 0 16 25.546M11.91 16a4.09 4.09 0 1 1 2.044 3.544"
                        stroke="#ffffff" strokeWidth="1.25"
                    ></path>
                </svg>
            </div>
            <span className={style.touchButton__title}>TOUCH SCREEN</span>
        </button>
    )
}