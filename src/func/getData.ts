interface Member {
    mapPosition: number;
    name: string;
    townhallLevel: number;
    attacks?: Attack[];
}

interface Attack {
    defenderTag: string;
    destructionPercentage: number;
    stars: number;
}

interface Opponent {
    tag: string;
    name: string;
    townhallLevel: number;
}

interface Data {
    mapPosition: number;
    name: string;
    townhallLevel: number;
    totalAttack: number;
    attacks?: number;
    attack_1_tag?: string;
    attack_1_name?: string;
    attack_1_townhallLevel?: number;
    attack_1_destructionPercentage?: number;
    attack_1_stars?: number;
    attack_2_tag?: string;
    attack_2_name?: string;
    attack_2_townhallLevel?: number;
    attack_2_destructionPercentage?: number;
    attack_2_stars?: number;
    same_hall_star: number;
    high_hall_star: number;
    low_hall_star: number;
    same_hall_attack_count: number;
    high_hall_attack_count: number;
    low_hall_attack_count: number;
    total_stars?: number;
    avg_stars?: number;
    avg_same_hall_stars?: number;
    [key: string]: any; // 동적 속성을 위한 인덱스 시그니처
}

export default async function getData(current_war: any): Promise<Data[]> {
    let list: Data[] = []; // Initialize an empty array
    const clan: Member[] = await current_war.clan.members;
    const opponent: Opponent[] = await current_war.opponent.members;

    clan.forEach(member => {
        let data: Data = {
            mapPosition: member.mapPosition,
            name: member.name,
            townhallLevel: member.townhallLevel,
            totalAttack: current_war.attacksPerMember,
            same_hall_star: 0,
            high_hall_star: 0,
            low_hall_star: 0,
            same_hall_attack_count: 0,
            high_hall_attack_count: 0,
            low_hall_attack_count: 0,
            attacks: 0,
            point: 0
        };

        if (member.attacks) {
            data.attacks = member.attacks.length;
            member.attacks.forEach((attack, index) => {
                const attackIndex = index + 1;
                const opponentMember = opponent.find(item => item.tag === attack.defenderTag);
                if (opponentMember) {
                    data[`attack_${attackIndex}_tag`] = attack.defenderTag;
                    data[`attack_${attackIndex}_name`] = opponentMember.name;
                    data[`attack_${attackIndex}_townhallLevel`] = opponentMember.townhallLevel;
                    data[`attack_${attackIndex}_destructionPercentage`] = attack.destructionPercentage;
                    data[`attack_${attackIndex}_stars`] = attack.stars;
                }
            });
            if (data.attack_1_stars !== undefined && data.attack_1_townhallLevel !== undefined) {
                data.point = data.attack_1_stars + (data.attack_1_townhallLevel - data.townhallLevel) * 0.5;
            } else {
                data.point = 0;
            }
        }

        // Calculate stars and attacks count based on townhall level comparison
        for (let i = 1; i <= 2; i++) {
            if (data[`attack_${i}_townhallLevel`] !== undefined) {
                if (data.townhallLevel === data[`attack_${i}_townhallLevel`]) {
                    data.same_hall_star += data[`attack_${i}_stars`];
                    data.same_hall_attack_count++;
                } else if (data.townhallLevel < data[`attack_${i}_townhallLevel`]) {
                    data.high_hall_star += data[`attack_${i}_stars`];
                    data.high_hall_attack_count++;
                } else {
                    data.low_hall_star += data[`attack_${i}_stars`];
                    data.low_hall_attack_count++;
                }
            }
        }

        data.total_stars = (data.attack_1_stars || 0) + (data.attack_2_stars || 0);
        data.attacks && (data.avg_stars = data.total_stars / data.attacks);
        data.same_hall_attack_count && (data.avg_same_hall_stars = data.same_hall_star / data.same_hall_attack_count);

        list.push(data);
        list.sort((a, b) => a.mapPosition - b.mapPosition);

    });

    return list;
}
