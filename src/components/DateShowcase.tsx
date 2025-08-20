import React, {Fragment} from "react";
import styles from "../styles/DateShowcase.module.scss";
import {historicalPeriods} from "../data";


const DateShowcase = () => {
    return (
        // title
        <div className={styles.container}>
            <div className={styles.titleWrapper}>
                <div className={styles.titleHighlight}></div>
                <h3 className={styles.title}>Исторические <br/> даты</h3>
            </div>

            {/*carousel*/}
            <section className={styles.carouselWrapper}>
                <div className={styles.carousel}>
                    {historicalPeriods.map((period) => {
                        const {id, title} = period;

                        return <div className={styles.periodWrapper} key={id}>
                            <button className={styles.periodButton}>{id}</button>
                            <h2 className={styles.periodTitle}>{title}</h2>
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
                        <button className={styles.paginatioButtonPrev}></button>
                        <button className={styles.paginatioButtonNext}></button>
                    </div>
                </div>
            </section>

            {/*slider*/}
            <div className={styles.sliderWrapper}></div>
        </div>
    )
}

export default DateShowcase;