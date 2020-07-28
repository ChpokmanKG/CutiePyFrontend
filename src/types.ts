export type Problem = {
  id: number,
  pack: number,
  title: string,
  content: string,
  created: string,
  complexity: string,
  is_solved: boolean
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

export type DecodeToken = {
  access: string;
  refresh: string;
  exp: number,
  jti: string,
  token_type: string,
  user_id: number
}

export type Tokens = {
  access: string,
  expires_in: string,
  refresh: string
}

export type Solved = {
  problem: number,
  is_solved: boolean
}
