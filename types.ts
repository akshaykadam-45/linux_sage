
export interface CommandFlag {
  flag: string;
  description: string;
}

export interface CommandExample {
  code: string;
  explanation: string;
}

export interface CommandPart {
  part: string;
  meaning: string;
}

export interface SyntaxError {
  isError: boolean;
  location?: string;
  reason?: string;
  correction?: string;
}

export interface CommandExplanation {
  command: string;
  summary: string;
  detailedDescription: string;
  synopsis: string;
  inputBreakdown?: CommandPart[]; // Analysis of the specific input provided by user
  syntaxError?: SyntaxError; // Details if the input command was malformed
  flags: CommandFlag[];
  examples: CommandExample[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  safetyWarning?: string;
}

export interface HistoryItem {
  id: string;
  command: string;
  timestamp: number;
}
