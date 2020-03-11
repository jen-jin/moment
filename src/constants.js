const ROOT_API = "http://localhost:5000/api";

export const AUTH_TOKEN = "auth-token";
export const GOALS_PATH = ROOT_API + "/goals";
export const SUBGOALS_PATH = ROOT_API + "/subgoals";
export const REFLECTION_PATH = ROOT_API + "/reflections";
export const RESOURCES_PATH = ROOT_API + "/resources";
export const USERS_PATH = ROOT_API + "/users";
export const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": true
};
export const SUCCESS = "success";

export const DRAWER_WIDTH = 250;

export const DATE_OPTIONS = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute:'2-digit'};

export const DATE_OPTIONS_2 = { year: 'numeric', month: 'short', day: 'numeric' };

export const DEFAULT_REFLECTION_TITLE = "Untitled Reflection";

export const DEFAULT_TEXTBOX_PLACEHOLDER = "Type your answer here";

export const ACTIVITY_OPTIONS = [
  "Blowing bubbles",
  "Colouring",
  "Cooking",
  "Dressing up",
  "Exercising",
  "Having snack",
  "Hide and Seek",
  "Interacting with pets",
  "Playing blocks",
  "Playing games",
  "Playing music",
  "Playing toys",
  "Playing trampoline",
  "Reading books",
  "Riding cars",
  "Running",
  "Science experiment",
  "Taking pictures",
  "Watching movies"
]
