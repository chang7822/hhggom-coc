import { useEffect, useState } from "react"
import styled, { createGlobalStyle } from "styled-components"
import reset from "styled-reset"
import LoadingScreen from "./components/loading-screen"
import getData from "./func/getData"
import Card from "./components/card"


const GlobalStyles = createGlobalStyle`
${reset};
*{
  box-sizing: border-box;
}

body {
  background-color : black;
  color : white;
  font-family : system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', 
  Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
}
`;

const Wrapper = styled.div`
height: 100%;
display: flex;
justify-content: center;
`

function App() {

  const [isLoading, setLoading] = useState(true);
  const [warData, setWarData] = useState<any[]>([]);


  // const clanTag = import.meta.env.VITE_APP_CLAN_TAG;
  const headers = {
    'Authorization': `Bearer ${import.meta.env.VITE_APP_API_KEY}`,
    'Accept': 'application/json'
  };

  const init = async () => {
    try {
      const response = await fetch(`/v1/clans/%238QQYGRGQ/currentwar`, { method: 'GET', headers: headers });
      const data = await response.json();
      let current_war_data = await getData(data);
      setWarData(current_war_data);

    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    init();
  }, [])


  return <Wrapper>
    <GlobalStyles />
    {isLoading ? <LoadingScreen /> :
      (<div>
        <div>
          <h1 style={{ fontWeight: "bold", fontSize: 40, lineHeight: 2 }}>현재 클랜전 스코어</h1>
          <span style={{ fontWeight: "bold", fontSize: 25, lineHeight: 2 }}>한전1팀 (프리죵, 늘보, 지간이) : </span>
          <span style={{ fontWeight: "bold", fontSize: 30, lineHeight: 2, color: "red" }}>{
            (warData.find(member => member.name === "프리죵")?.point ?? 0)
            + (warData.find(member => member.name === "늘보")?.point ?? 0)
            + (warData.find(member => member.name === "지간이")?.point ?? 0)
          }</span>
          <span>  ( {(warData.find(member => member.name === "프리죵")?.point ?? 0)}
            + {(warData.find(member => member.name === "늘보")?.point ?? 0)}
            + {(warData.find(member => member.name === "지간이")?.point ?? 0)} )</span>
          <br />
          <span style={{ fontWeight: "bold", fontSize: 25, lineHeight: 2 }}>한전2팀 (키킼, 샤이니즘, taker) : </span>
          <span style={{ fontWeight: "bold", fontSize: 30, lineHeight: 2, color: "red" }}>{
            (warData.find(member => member.name === "키킼")?.point ?? 0)
            + (warData.find(member => member.name === "샤이니즘")?.point ?? 0)
            + (warData.find(member => member.name === "taker")?.point ?? 0)
          }</span>
          <span>  ( {(warData.find(member => member.name === "키킼")?.point ?? 0)}
            + {(warData.find(member => member.name === "샤이니즘")?.point ?? 0)}
            + {(warData.find(member => member.name === "taker")?.point ?? 0)} )</span>
          <br />
          <span style={{ fontWeight: "bold", fontSize: 25, lineHeight: 2 }}>현차팀 (흑곰, 리만, 다날라간다잉) : </span>
          <span style={{ fontWeight: "bold", fontSize: 30, lineHeight: 2, color: "red" }}>{
            (warData.find(member => member.name === "흑곰")?.point ?? 0)
            + (warData.find(member => member.name === "리만")?.point ?? 0)
            + (warData.find(member => member.name === "다날라간다잉")?.point ?? 0)
          }</span>
          <span>  ( {(warData.find(member => member.name === "흑곰")?.point ?? 0)}
            + {(warData.find(member => member.name === "리만")?.point ?? 0)}
            + {(warData.find(member => member.name === "다날라간다잉")?.point ?? 0)} )</span>
          <br />
          <span style={{ fontWeight: "bold", fontSize: 25, lineHeight: 2 }}>올스타팀 (asong, 비니, 에펠탑) : </span>
          <span style={{ fontWeight: "bold", fontSize: 30, lineHeight: 2, color: "red" }}>{
            (warData.find(member => member.name === "asong")?.point ?? 0)
            + (warData.find(member => member.name === "비니")?.point ?? 0)
            + (warData.find(member => member.name === "에펠탑")?.point ?? 0)
          }</span>
          <span>  ( {(warData.find(member => member.name === "asong")?.point ?? 0)}
            + {(warData.find(member => member.name === "비니")?.point ?? 0)}
            + {(warData.find(member => member.name === "에펠탑")?.point ?? 0)} )</span>
          <br />
        </div>
        {warData.map((member) => (
          <Card
            key={member.name}
            point={member.point}
            attack_1_destructionPercentage={member.attack_1_destructionPercentage}
            attack_1_stars={member.attack_1_stars}
            attack_2_destructionPercentage={member.attack_2_destructionPercentage}
            attack_2_stars={member.attack_2_stars}
            attack_1_townhallLevel={member.attack_1_townhallLevel}
            attack_2_townhallLevel={member.attack_2_townhallLevel}
            attacks={member.attacks}
            avg_same_hall_stars={member.avg_same_hall_stars}
            avg_stars={member.avg_stars}
            high_hall_attack_count={member.high_hall_attack_count}
            high_hall_star={member.high_hall_star}
            low_hall_attack_count={member.low_hall_attack_count}
            low_hall_star={member.low_hall_star}
            mapPosition={member.mapPosition}
            name={member.name}
            same_hall_attack_count={member.same_hall_attack_count}
            same_hall_star={member.same_hall_star}
            totalAttack={member.totalAttack}
            total_stars={member.total_stars}
            townhallLevel={member.townhallLevel}
          />
        ))}
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>)
    }
  </Wrapper>
}

export default App

