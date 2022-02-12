import React, { useState } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client';
import { InputNumber, Loading, SaveButton } from 'elements/core'

const SaveResultMutation = gql`
  mutation userResults($input: [inputUserResult!]!) {
  userResults(input: $input) {
    local_score
    away_score
  }
}
`

const MatchTable = ({ title, matches }) => {
  let allInputFilled = true; // if there are all filled

  const initResults = matches.reduce((results, match) => {
    const is_result = !!match.user_result
    allInputFilled = allInputFilled && !is_result
    let local = !!match.score_local ? match.score_local : ''
    let away = !!match.score_local ? match.score_away : ''
    if(is_result) {
      local = match.user_result.local_score
      away = match.user_result.away_score
    }
    results[match.id] = { is_result, local, away }
    return results
  }, {})

  const [results, setResults] = useState(initResults)
  const [editionMode, setEditionMode] = useState(!allInputFilled)
  const [save, { data: savedData, loading }] = useMutation(SaveResultMutation, {
    onCompleted: response => {
      setEditionMode(false)
    }
  })

  const changeResult = ({ key, side, value}) => {
    if(onlyNumbers(value)) {
      setResults( prevState => ({...prevState, [key]: {...prevState[key], [side]: value }}))
    }
  }

  const onlyNumbers = (value) => {
    return /^[0-9]+$/.test(value)
  }

  const submit = () => {
    const input = Object.keys(results).map( key => {
      return {
        match_id: key,
        local_score: +results[key].local,
        away_score: +results[key].away,
      }
    })
    save(({ variables: { input } }))
  }

  return (
    <>
      <div className="h-full rounded-md bg-brand-blue-grey">
          <ul className="grid grid-cols-12 p-2">
            <li className="col-span-12 font-semibold text-brand-orange">{title}</li>
          </ul>
          <ul className="grid grid-cols-12 p-2 bg-brand-marine">
            <li className="col-span-7 font-semibold">Date</li>
            <li className="col-span-2 font-semibold text-center">
              <span>Matches</span>
              { !editionMode && <button className="pl-4 font-thin square-effect-white"
              onClick={ txt => setEditionMode( oldVal => !oldVal) }>Edit</button>}
            </li>
            <li className="col-span-3"></li>
          </ul>
          { !!matches && matches.map(function(match, key) {
            return (
              <ul className="grid grid-cols-12 px-2 py-1 font-thin bg-brand-blue-grey" key={match.id}>
                <li className="col-span-4">{match.started_at}</li>
                <li className="col-span-3 text-right">{match.local.name}</li>
                {
                  editionMode
                  ? (
                    <>
                      <li className="flex justify-around col-span-1">
                        <InputNumber name={`${match.id}-local`} value={results[match.id].local} onChange={ txt => changeResult({'value': txt, 'key': match.id, 'side': 'local'})}/>
                      </li>
                      <li className="flex justify-around col-span-1">
                        <InputNumber name={`${match.id}-away`} value={results[match.id].away} onChange={ txt => changeResult({'value': txt, 'key': match.id, 'side': 'away'}) }/>
                      </li>
                    </>
                  )
                  : (
                    <li className="flex justify-around col-span-2">
                      <span>{`${results[match.id].local} - ${results[match.id].away}`}</span>
                    </li>
                  )
                }
                <li className="col-span-3 text-left">{match.away.name}</li>
              </ul>
            )
          })}
          {
            editionMode && (
              <ul className="grid grid-cols-12 p-2 font-thin rounded-md bg-brand-blue-grey">
              <li className="col-span-7"></li>
              <li className="flex justify-around col-span-2"><SaveButton text="Save" onClick={submit} /></li>
              <li className="col-span-3"></li>
            </ul>
            )
          }
      </div>
    </>
  )
}

export { MatchTable }
