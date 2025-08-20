import React, {useState} from "react";
import styles from "../styles/DateShowcase.module.scss";
import Carousel from "./Carousel";
import Slider from "./Slider";

import {initialHistoricalPeriods} from "../data";


const DateShowcase = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [historicalPeriods, setHistoricalPeriods] = useState(initialHistoricalPeriods)


    return (
        // title
        <div className={styles.container}>
            <div className={styles.titleWrapper}>
                <div className={styles.titleHighlight}></div>
                <h3 className={styles.title}>Исторические <br/> даты</h3>
            </div>

            <Carousel historicalPeriods={historicalPeriods} currentPage={currentPage} setCurrentPage={setCurrentPage}/>

            {/*slider*/}
            <Slider/>
        </div>
    )
}

export default DateShowcase;