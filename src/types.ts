export type Problem = {
  id: number,
  pack: number,
  title: string,
  content: string,
  created: string,
}

export type Pack = {
  id: number,
  name: string,
  problems: Problem[]
}

export type Submissions = {
  id: number,
  username: string,
  problem: number,
  problem_title: string,
  problem_content: string,
  number: number,
  datafile: string | null,
  content: string,
  status: string,
  created: string
}

export type EditorType = {
  code: string,
  onChange?: (newValue: string) => void
}


