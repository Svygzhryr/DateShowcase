import styles from "../styles/Carousel.module.scss";
import React, {FC, SetStateAction, useEffect} from "react";
import {IHistoricalPeriod} from "../data";

interface CarouselProps {
    historicalPeriods: IHistoricalPeriod[];
    currentPage: number;
    setCurrentPage: React.Dispatch<SetStateAction<number>>
}

const useCircularLayout = (count: number, radius: number) => {
    return Array.from({ length: count }, (_, i) => {
        const angle = (i * 2 * Math.PI) / count - Math.PI / 2;
        return {
            x: radius * Math.cos(angle),
            y: radius * Math.sin(angle)
        };
    });
};

const Carousel: FC<CarouselProps> = ({historicalPeriods ,currentPage, setCurrentPage}) => {

    const coordinates = useCircularLayout(historicalPeriods.length, 265);

    function handleChangePage(type: 'next' | 'prev' | 'to', payload?: number) {
        switch (type) {
            case 'next': {
                // будет зависеть от длины массива
                if (currentPage === 6) {
                    setCurrentPage(1)
                } else {
                    setCurrentPage((prev) => prev + 1);
                }
                break;
            }
            case 'prev': {
                if (currentPage === 1) {
                    // будет зависеть от длины массива
                    setCurrentPage(6)
                } else {
                    setCurrentPage((prev) => prev - 1);
                }
                break;
            }

            case 'to': {
                setCurrentPage(payload ?? 1);
                break;
            }
        }
    }

    return (
        <>
            <section className={styles.carouselWrapper}>
                <div className={styles.carousel}>
                    {historicalPeriods.map((period, index) => {
                        const {id, title} = period;
                        const xProperty = coordinates[index].x;
                        const yProperty = coordinates[index].y

                        return <div style={{left: `calc(50% + ${xProperty}px)`, top: `calc(50% + ${yProperty}px)`}} className={styles.periodWrapper} key={id}>
                            <button className={styles.periodButton}></button>
                            <h2 className={styles.periodTitle}></h2>
                        </div>
                    })}
                </div>

                <div className={styles.numbersWrapper}>
                    <h2>2015</h2>
                    <h2>2022</h2>
                </div>

                <div className={styles.paginationWrapper}>
                    <p className={styles.pageNumbers}></p>

                    <div className={styles.paginationButtonsWrapper}>
                        <button onClick={() => handleChangePage('prev')} className={styles.paginatioButtonPrev}>&lt;</button>
                        <button onClick={() => handleChangePage('next')} className={styles.paginatioButtonNext}>&gt;</button>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Carousel;