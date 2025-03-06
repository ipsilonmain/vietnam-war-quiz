import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import Confetti from "react-confetti";

const questions = [
  { question: "Kdy začala válka ve Vietnamu?", options: ["1955", "1960", "1965", "1970"], answer: 0, points: 1000 },
  { question: "Jaký stát podporoval Severní Vietnam?", options: ["USA", "Sovětský svaz", "Velká Británie", "Francie"], answer: 1, points: 1000 },
  // Přidáno dalších 18 otázek
  { question: "Jak se jmenovala ofenziva Vietkongu v roce 1968?", options: ["Tet", "Saigon", "Hanoj", "Hue"], answer: 0, points: 1000 },
  { question: "Jaký chemický defoliant používala americká armáda?", options: ["Agent Orange", "Napalm", "Mustard Gas", "VX"], answer: 0, points: 1000 },
  { question: "Jak se jmenoval hlavní severovietnamský generál?", options: ["Võ Nguyên Giáp", "Ho Či Min", "Nguyễn Văn Thiệu", "Dương Văn Minh"], answer: 0, points: 1000 },
  { question: "Kdy padl Saigon, čímž válka skončila?", options: ["30. dubna 1975", "15. srpna 1974", "4. července 1976", "1. ledna 1975"], answer: 0, points: 1000 },
  { question: "Jaký tunelový systém používali Vietkongové?", options: ["Cu Chi", "Ho Či Minovy tunely", "Saigonské podzemí", "Mekongské jeskyně"], answer: 0, points: 1000 },
  { question: "Jaká bitva byla považována za rozhodující v roce 1954?", options: ["Dien Bien Phu", "Hue", "Saigon", "Tet"], answer: 0, points: 1000 },
  { question: "Jak se jmenovala slavná stezka používaná k zásobování Vietkongu?", options: ["Ho Či Minova stezka", "Mekongská cesta", "Saigonská dálnice", "Rudá trasa"], answer: 0, points: 1000 },
  { question: "Jak se jmenovala operace rozsáhlého bombardování Severního Vietnamu?", options: ["Operation Rolling Thunder", "Desert Storm", "Operation Enduring Freedom", "Tet Offensive"], answer: 0, points: 1000 },
  { question: "Jaký byl hlavní typ helikoptéry používaný USA ve Vietnamu?", options: ["UH-1 Huey", "Black Hawk", "Apache", "Chinook"], answer: 0, points: 1000 },
  { question: "Jak se jmenovala věznice v Hanoji, kde byli drženi američtí váleční zajatci?", options: ["Hanojský Hilton", "Vietnamské peklo", "Saigonský žalář", "Zajatecký tábor Dien Bien Phu"], answer: 0, points: 1000 },
  { question: "Jaký americký prezident rozšířil válku do Kambodže?", options: ["Richard Nixon", "Lyndon B. Johnson", "John F. Kennedy", "Gerald Ford"], answer: 0, points: 1000 },
  { question: "Jaká slavná fotografie zobrazovala děsivé následky napalmového útoku?", options: ["Napalm Girl", "Saigon Execution", "Burning Monk", "Fall of Saigon"], answer: 0, points: 1000 },
  { question: "Jak se nazývala dohoda, která ukončila přímé zapojení USA do války?", options: ["Pařížské mírové dohody", "Ženevské konvence", "Dohoda o ukončení války", "Washingtonská smlouva"], answer: 0, points: 1000 },
  { question: "Jaká země byla v roce 1975 sjednocena pod komunistickou vládou?", options: ["Vietnam", "Kambodža", "Laos", "Thajsko"], answer: 0, points: 1000 },
  { question: "Jaká událost v roce 1964 vedla k eskalaci americké účasti ve válce?", options: ["Incident v Tonkinském zálivu", "Tet Offensive", "Pařížské mírové dohody", "Pád Saigonu"], answer: 0, points: 1000 },
  { question: "Jaké město bylo hlavním městem Jižního Vietnamu?", options: ["Saigon", "Hanoj", "Hue", "Da Nang"], answer: 0, points: 1000 },
  { question: "Jaké síly bojovaly na straně Jižního Vietnamu?", options: ["ARVN", "Vietkong", "Rudá armáda", "NVA"], answer: 0, points: 1000 },
  { question: "Jaký byl hlavní důvod, proč USA zasáhly do války ve Vietnamu?", options: ["Zastavení šíření komunismu", "Získání ropy", "Obchodní dohody", "Osobní konflikt s Ho Či Minem"], answer: 0, points: 1000 },
  { question: "Která událost v roce 1968 výrazně změnila veřejné mínění o válce v USA?", options: ["Masakr v My Lai", "Pařížské mírové dohody", "Vznik Ho Či Minovy stezky", "Invaze do Kambodže"], answer: 0, points: 1000 },
  { question: "Jak se jmenoval prezident Jižního Vietnamu, který byl svržen v roce 1963?", options: ["Ngo Dinh Diem", "Nguyen Van Thieu", "Võ Nguyên Giáp", "Dương Văn Minh"], answer: 0, points: 1000 },
];

const teamColors = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500"];

const VietnamWarQuiz = () => {
  const [teams, setTeams] = useState([]);
  const [scores, setScores] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedTeam, setSelectedTeam] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [showStartMenu, setShowStartMenu] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [lifelines, setLifelines] = useState([]);
  const [countdowns, setCountdowns] = useState({});
  const [winningTeam, setWinningTeam] = useState(null);

  const startGame = () => {
    if (teams.length < 2) return;
    setScores(Array(teams.length).fill(0));
    setLifelines(Array(teams.length).fill({ phone: 2, hint: 2 }));
    setShowStartMenu(false);
  };

  const usePhoneJoker = (index) => {
    if (lifelines[index].phone > 0) {
      setLifelines((prev) => {
        const newLifelines = [...prev];
        newLifelines[index] = { ...newLifelines[index], phone: newLifelines[index].phone - 1 };
        return newLifelines;
      });
      setCountdowns((prev) => ({ ...prev, [index]: 60 }));
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdowns((prev) => {
        const newCountdowns = { ...prev };
        Object.keys(newCountdowns).forEach((key) => {
          if (newCountdowns[key] > 0) {
            newCountdowns[key] -= 1;
          }
        });
        return newCountdowns;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAnswer = (index) => {
    if (answered) return;
    setAnswered(true);
    const correct = index === questions[currentQuestion].answer;
    if (correct) {
      setScores((prev) => {
        const newScores = [...prev];
        newScores[selectedTeam] += questions[currentQuestion].points;
        return newScores;
      });
    }
    setTimeout(() => {
        if (currentQuestion + 1 >= questions.length) {
          setGameOver(true);
          const maxScore = Math.max(...scores);
          setWinningTeam(teams[scores.indexOf(maxScore)]);
        } else {
          setCurrentQuestion((prev) => prev + 1);
          setSelectedTeam((prev) => (prev + 1) % teams.length);
          setAnswered(false);
        }
      }, 2000);
    };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-4">SOŠKVÍZ APP</h1>
      <p className="text-sm">Vytvořil: Jaroslav Boyko</p>
      {gameOver ? (
        <div className="text-center relative">
          <h2 className="text-4xl font-bold">Vítěz: {winningTeam} 🏆</h2>
          <Confetti width={1920} height={1080} />
        </div>
      ) : showStartMenu ? (
        <div className="w-full max-w-md">
          <h2 className="text-xl font-semibold mb-2">Zadejte názvy týmů</h2>
          {teams.map((team, index) => (
            <input
              key={index}
              type="text"
              value={team}
              onChange={(e) => {
                const newTeams = [...teams];
                newTeams[index] = e.target.value;
                setTeams(newTeams);
              }}
              className="w-full p-2 mb-2 border rounded"
              placeholder={`Tým ${index + 1}`}
            />
          ))}
          {teams.length < 4 && <Button onClick={() => setTeams([...teams, `Tým ${teams.length + 1}`])}>Přidat tým</Button>}
          <Button onClick={startGame} className="ml-2">Začít hru</Button>
        </div>
      ) : (
        <div className="flex flex-col items-center w-full max-w-2xl">
          <h2 className="text-xl font-bold mb-4">Na tahu: {teams[selectedTeam]}</h2>
          <Card className="w-full mb-4 p-4">
            <h3 className="text-lg font-bold">{questions[currentQuestion].question}</h3>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {questions[currentQuestion].options.map((option, index) => (
                <Button key={index} className="p-2" onClick={() => handleAnswer(index)}>{option}</Button>
              ))}
            </div>
          </Card>
          <div className="flex justify-between w-full mb-4">
            {teams.map((team, index) => (
              <div key={index} className={`p-4 rounded-lg ${teamColors[index]} text-white text-center w-1/4`}>
                <h3 className="text-xl font-bold">{team}</h3>
                <p className="text-lg">{scores[index]} bodů</p>
                <div className="mt-2">
                  <Button onClick={() => usePhoneJoker(index)} disabled={lifelines[index].phone === 0}>
                    📞 {lifelines[index].phone}
                  </Button>
                  {countdowns[index] > 0 && (
                    <motion.div className="bg-gray-800 text-white p-2 rounded mt-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      ⏳ {countdowns[index]}s
                    </motion.div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VietnamWarQuiz;
