
import styles from "./Search2.module.css";
export default function Search2() {




    return (
        <>
            <div className={styles.search_container}>
                {/* <div className={styles.icon}>
           <Image src={searchIcon}  width={25} height={20}/>
           </div> */}

                <input
                    type="text"
                    placeholder="Seach for drugs in our store"

                />

                <div className={styles.shadow_search} />
                <button className={styles.searchButton}>Find drug</button>
            </div>

        </>
    )
}