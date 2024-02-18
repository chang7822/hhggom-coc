import styles from "../Card.module.css";

// CardProps 인터페이스 정의
interface CardProps {
    point: number;
    attack_1_destructionPercentage: number;
    attack_1_stars: number;
    attack_2_destructionPercentage: number;
    attack_2_stars: number;
    attack_1_townhallLevel: number;
    attack_2_townhallLevel: number;
    attacks: number; // 이 값의 타입이 맞는지 확인하세요.
    avg_same_hall_stars: number;
    avg_stars: number;
    high_hall_attack_count: number;
    high_hall_star: number;
    low_hall_attack_count: number;
    low_hall_star: number;
    mapPosition: number;
    name: string;
    same_hall_attack_count: number;
    same_hall_star: number;
    totalAttack: number;
    total_stars: number;
    townhallLevel: number;
}

export default function Card({
    point,
    attack_1_destructionPercentage,
    attack_1_stars,
    attack_2_destructionPercentage,
    attack_2_stars,
    attack_1_townhallLevel,
    attack_2_townhallLevel,
    attacks,
    avg_same_hall_stars,
    avg_stars,
    high_hall_attack_count,
    low_hall_attack_count,
    mapPosition,
    name,
    same_hall_attack_count,
    same_hall_star,
    totalAttack,
    total_stars,
    townhallLevel,
}: CardProps) {
    return (
        <div className={styles.cardContainer}>
            <div className={styles.firstSection}>
                <span style={{ fontWeight: "bold", fontSize: 25 }}>{mapPosition}. {name}</span>
                <span style={{ marginLeft: 20 }}>마을회관: {townhallLevel}</span>
                <span style={{ marginLeft: 20, color: "red", fontWeight: "bold" }}>획득 포인트 : {isNaN(point) ? "-" : point}</span>
                <br />
                <hr />
            </div>
            <div className={styles.secondRow}>
                <div className={styles.middleSections}>
                    <p style={{ lineHeight: 2 }}>총 공격권: {totalAttack}</p>
                    <p style={{ lineHeight: 1 }}>공격 횟수: {attacks}</p>
                    <p style={{ lineHeight: 1.5 }}>잔여 공격: {totalAttack - attacks}</p>
                    <p style={{ lineHeight: 1.5, fontSize: 14 }}>상방/동홀/하방</p>
                    <p style={{ fontSize: 18 }}>: [{high_hall_attack_count} / {same_hall_attack_count} / {low_hall_attack_count}]</p>
                    <br />
                </div>
                <div className={styles.middleSections}>
                    <h3 style={{ fontWeight: "bold", lineHeight: 2 }}>제 1 공격</h3>
                    <p style={{ lineHeight: 2 }}>상대 회관: {(attack_1_townhallLevel ?? "-")}</p>
                    <p>획득 별: {(attack_1_stars ?? "-")} ({(attack_1_destructionPercentage ?? "-")}%)</p>

                </div>
                <div className={styles.middleSections}>
                    <h3 style={{ fontWeight: "bold", lineHeight: 2 }}>제 2 공격</h3>
                    <p style={{ lineHeight: 2 }}>상대 회관: {(attack_2_townhallLevel ?? "-")}</p>
                    <p>획득 별: {(attack_2_stars ?? "-")} ({(attack_2_destructionPercentage ?? "-")}%)</p>

                </div>
                <div className={styles.middleSections}>
                    <br />
                    <br />
                    <p style={{ lineHeight: 2 }}>총 획득 별: {total_stars}</p>
                    <p style={{ lineHeight: 2 }}>평균 획득별: {(avg_stars ?? 0).toFixed(1)}</p>

                </div>
                <div className={styles.middleSections}>
                    <br />
                    <br />
                    <p style={{ lineHeight: 2 }}>동홀 획득 별: {same_hall_star}</p>
                    <p style={{ lineHeight: 2 }}>동홀 평균별: {(avg_same_hall_stars ?? 0).toFixed(1)}</p>
                </div>
            </div>
        </div>
    );
}
