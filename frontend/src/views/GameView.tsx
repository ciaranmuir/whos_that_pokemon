import React, {useEffect, useState} from 'react'
import {usePokeAPI} from "../hooks/usePokeAPI";
import ButtonPanel from "../components/ButtonPanel/ButtonPanel";
import {queryVerifyPokemon} from "../client/queries/queries";
const GameView = () => {
    //set up query to backend to get random pokemon
    const { getRandomPokemon, verifyPokemon, error, loading} = usePokeAPI()
    const [pokemon, setPokemon] = useState<Pokemon | undefined>(undefined)
    const [options, setOptions] = useState<string[]>(['?', '?', '?', '?'])
    const handleSetUp = () => {
        getRandomPokemon().then((resp) => {
            if (resp) {
                setPokemon(resp.data.pokemon)
                console.log('data', resp.data.nameOptions)
                setOptions(resp.data.nameOptions)
            } else if (error) {
                console.log('error', error)
            }
        })
    }

    const handlerGuess = (guess: string) => {
        console.log('guess', guess)
        queryVerifyPokemon(pokemon?.id ?? '', guess).then((resp) => {
            if (resp) {
                handleSetUp()
            } else if (error) {
                console.log('error', error)
            }
        })
    }

    useEffect(() => {
        handleSetUp()
    },[])

    return (
        <div className={'flex flex-col min-h-full gap-16 w-full max-h-full'}>
            {
                loading ?
                    <div className={'flex flex-row justify-center'}>
                        <img className={'mx-auto poke-pulse mt-[2%] h-60'} src={"./svgs/suspense/pokeball.svg"} alt="Logo" />
                    </div>
                    :
                    <div className={'flex flex-row justify-center'}>
                        <img className={'mx-auto mt-[2%] h-60'} src={pokemon ? pokemon.silhouette : "./svgs/suspense/gaming.svg"} alt="Logo" />
                    </div>
            }
            <div className={'button-panel-container'} >
                <ButtonPanel options={options} onClick={handlerGuess} disabled={loading}/>
            </div>
        </div>
    )
}

export default GameView