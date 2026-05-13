import { useState,useEffect } from "react"


function MemoryCard() {
    const [currentScore, setCurrentScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [clickedCard, setClickedCard] = useState([]);
    const [pokemonCard, setPokemonCard] = useState([]);

    useEffect(() => {
      const fetchPokemon = async () => {
        try {
          const response = await fetch(
            "https://pokeapi.co/api/v2/pokemon?limit=20",
          );

          const data = await response.json();

          const detailedPokemon = await Promise.all(
            data.results.map(async (pokemon) => {
              const res = await fetch(pokemon.url);

              const pokeData = await res.json();

              return {
                id: pokeData.id,
                name: pokeData.name,
                image: pokeData.sprites.front_default,
              };
            }),
          );

          setPokemonCard(detailedPokemon);
        } catch (error) {
          console.log(error);
        }
      };

      fetchPokemon();
    }, []);

    const shuffleCards = () => {
      const shuffled = [...pokemonCard].sort(() => Math.random() - 0.5);

      setPokemonCard(shuffled);
    };

    const handleClick = (id) =>{
        if(clickedCard.includes(id)){
            if(currentScore > bestScore){
            setBestScore(currentScore);
        }
        setCurrentScore(0)
        setClickedCard([]) 
        }else{
            setClickedCard([...clickedCard, id]);
            setCurrentScore(prev => prev + 1);  
            shuffleCards();
        }
        
    }
    

  return (
    <>
      <header className="header1">
        <h1 className="text-4xl font-bold">Memory Card</h1>
        <div className="header2">
          <div className="description">
            <div className="des1">
              <h2 className="text-2xl font-bold">
                Challenge your memory and concentration in this fun card game.
              </h2>
            </div>
            <div className="des2">
              <p>
                Select unique cards to increase your score, but selecting the
                same card twice will end the game. Try to beat your best score!
              </p>
            </div>
          </div>
          <div className="score">
            <div className="userScore">
              <p className="text-2xl">Score : {currentScore}</p>
            </div>
            <div className="bestScore">
              <p className="text-2xl">Best Score : {bestScore}</p>
            </div>
          </div>
        </div>
      </header>
      <main>
        <section className="sectionCards grid grid-cols-4 gap-4">
                {pokemonCard.map((poke) => (
                <div className="bg-amber-50  border-2 p-4 rounded-xl shadow-md hover:scale-105 duration-200" key={poke.id} onClick={()=> handleClick(poke.id)}>
                    <div className="imgBox flex justify-center">
                        <img src={poke.image} alt={poke.name} />
                    </div>
                    <div className="nameBox text-center ">
                        <h2 className="text-xl font-bold ">{poke.name}</h2>
                    </div>
                </div>
             ))}
            
          
        </section>
      </main>
    </>
  );
}

export default MemoryCard