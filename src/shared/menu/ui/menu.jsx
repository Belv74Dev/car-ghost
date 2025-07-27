import React, { useEffect, useRef, useState } from 'react'
import style from './style.module.css'

const smoothScroll = (targetId) => {
    const target = document.getElementById(targetId)
    if (!target) return

    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 800
    let startTime = null

    const animation = (currentTime) => {
        if (!startTime) startTime = currentTime
        const timeElapsed = currentTime - startTime
        const ease = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

        window.scrollTo(0, startPosition + distance * ease(Math.min(timeElapsed / duration, 1)))

        if (timeElapsed < duration) {
            requestAnimationFrame(animation)
        }
    };

    requestAnimationFrame(animation)
};

// eslint-disable-next-line react/prop-types
const Section = ({ id, refCallback, color }) => {
    return (
        <div
            id={id}
            ref={refCallback}
            style={{ height: '100vh', background: color }}
        />
    )
}

export const Menu = () => {
    const [view, setView] = useState(false)
    const refs = useRef([])

    const [scrollTop, setScrollTop] = useState(null)

    useEffect(() => {
        const handleScroll = () => {
            const scrollHeight = window.scrollY || document.documentElement.scrollTop
            let elementsHeigh = 0
            let globalPercentage = 0
            let elKey = null
            for (let i = 0; i < refs.current?.length; i++) {
                let percentage = 0
                const el = refs.current[i]
                if (el) {
                    const curElHeight = el.el.clientHeight
                    elementsHeigh += curElHeight
                    if (i === 0) {
                        percentage = Math.round(scrollHeight / curElHeight * 100 * 2)
                    } else {
                        const prevElHeight = refs.current[i - 1].el.clientHeight
                        const prevElementsHeight = (elementsHeigh - curElHeight - prevElHeight / 2)
                        if (i !== refs.current?.length - 1) {
                            percentage = Math.round((scrollHeight - prevElementsHeight) / curElHeight * 100)
                        } else {
                            const clientHeight = document.documentElement.clientHeight
                            const maxHeight = elementsHeigh - prevElementsHeight - clientHeight
                            const curScrollHeight = maxHeight - (scrollHeight - prevElementsHeight)

                            percentage = 100 - Math.round(curScrollHeight / maxHeight * 100)
                        }
                    }
                    elKey = el.key
                }
                if (percentage <= 100) {
                    globalPercentage = +percentage
                    break
                }
            }
            setScrollTop({ key: elKey, height: globalPercentage })
        };

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        if (view) {
            document.body.classList.add('menuMobile__hidden')
        } else {
            document.body.classList.remove('menuMobile__hidden')
        }

        return () => {
            document.body.classList.remove('menuMobile__hidden')
        };
    }, [view]);

    const sections = [
        {
            section: <Section id={0} refCallback={el => refs.current[0] = { el, key: 0 }} color={'red'} />,
            title: 'HOME1'
        },
        {
            section: <Section id={1} refCallback={el => refs.current[1] = { el, key: 1 }} color={'green'} />,
            title: 'HOME2'
        },
        {
            section: <Section id={2} refCallback={el => refs.current[2] = { el, key: 2 }} color={'white'} />,
            title: 'TECHNICAL DETAILS'
        },
        {
            section: <Section id={3} refCallback={el => refs.current[3] = { el, key: 3 }} color={'blue'} />,
            title: 'HOME4'
        },
        {
            section: <Section id={4} refCallback={el => refs.current[4] = { el, key: 4 }} color={'white'} />,
            title: 'HOME5'
        },
        {
            section: <Section id={5} refCallback={el => refs.current[5] = { el, key: 5 }} color={'blue'} />,
            title: 'HOME6'
        },
        {
            section: <Section id={6} refCallback={el => refs.current[6] = { el, key: 6 }} color={'white'} />,
            title: 'HOME7'
        },
    ]

    return (
        <>
            <div className={`${style.menu} ${view && style.menu_view}`} aria-hidden="true">
                <ul className={style.menu__list}>
                    {sections.map((section, i) => {
                        const active = scrollTop?.key === i
                        return (
                            <li
                                key={section.title}
                                className={`${style.menuItem} ${active && style.menuItem_active}`}
                                onClick={active ? () => { } : () => smoothScroll(i)}
                            >
                                <i className={style.menuItem__circle}>
                                    <svg height="18" width="18">
                                        <circle
                                            strokeDashoffset={active ? 50 - scrollTop.height * 0.5 : 50}
                                            cx="9"
                                            cy="9"
                                            r="8"
                                            strokeWidth="2"
                                            fill="none"
                                        >
                                        </circle>
                                    </svg>
                                </i>
                                <span className={style.menuItem__label}>
                                    <span className={style.menuItem__text}>{section.title}</span>
                                </span>
                            </li>
                        )
                    })}
                    <div className={style.menuItem__top} onClick={() => smoothScroll(0)}>
                        <svg width="16" height="8" viewBox="0 0 16 8" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.547.732L16 8 8 4 0 8 6.453.732A1.996 1.996 0 0 1 8 0c.623 0 1.18.285 1.547.732z"></path>
                        </svg>
                    </div>
                </ul>
                <button className={`${style.menuNotebookButton} ${view && style.menuNotebookButton_view}`} onClick={() => setView(view => !view)}>
                    <span className="" style={{ display: 'flex', width: '40px', height: '40px', border: '2px solid #969696', borderRadius: '50%', padding: '8px', flexDirection: 'center' }}>
                        {view
                            ? <svg viewBox="0 0 12 12" className={style.menuNotebookButton__iconClose} style={{ height: '12px', width: '12px', margin: '4px', fill: '#ffffff' }}>
                                <path d="M4.674 6L.344 1.05A.5.5 0 0 1 1.05.343L6 4.674l4.95-4.33a.5.5 0 0 1 .707.706L7.326 6l4.33 4.95a.5.5 0 0 1-.706.707L6 7.326l-4.95 4.33a.5.5 0 0 1-.707-.706L4.674 6z"></path>
                            </svg>
                            : <svg viewBox="0 0 24 24" className={style.menuNotebookButton__iconOpen} width="24" height="24" style={{ height: '20px', width: '24px', fill: '#969696' }}>
                                <circle cx="12" cy="4" r="2"></circle><circle cx="12" cy="12" r="2"></circle><circle cx="12" cy="20" r="2"></circle>
                            </svg>
                        }
                    </span>
                    <span className={style.menuNotebookButton__text}>{(scrollTop?.key || 0) + 1} / {sections.length}</span>
                </button>
            </div>

            <div className={`${style.menuMobile} ${view && style.menuMobile_view}`}>
                <div className={style.menuMobile__content}>
                    <ul className={style.menuMobile__list}>
                        {sections.map((item, i) => {
                            const active = scrollTop?.key === i
                            return (
                                <li
                                    key={item.title}
                                    className={style.menuMobile__listItem}
                                    style={{ opacity: active ? '0.5' : '1' }}
                                    onClick={active ? () => { } : () => {
                                        smoothScroll(i)
                                        setView(false)
                                    }}
                                >
                                    {item.title}
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div className={style.menuMobile__container}>
                    <div className={style.menuMobile__current} onClick={() => setView(view => !view)}>
                        <span className={style.menuMobile__currentTitle}>{sections[scrollTop?.key || 0].title}</span>
                        <svg width="16" height="8" viewBox="0 0 16 8" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.547.732L16 8 8 4 0 8 6.453.732A1.996 1.996 0 0 1 8 0c.623 0 1.18.285 1.547.732z"></path>
                        </svg>
                    </div>
                </div>

            </div>

            <div>
                {sections.map((section, i) => <React.Fragment key={i}>{section.section}</React.Fragment>)}
            </div>
        </>
    )
}