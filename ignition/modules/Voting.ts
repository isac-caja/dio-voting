import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';

const CANDIDATES = [
  "bolsonaro",
  "lula"
]

const VotingModule = buildModule('VotingModule', (m) => {
  const candidateList = m.getParameter('candidateList', CANDIDATES)

  const voting = m.contract('Voting', [candidateList])
  return { voting }
})

export default VotingModule;

