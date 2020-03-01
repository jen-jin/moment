const ROOT_API = "http://localhost:5000/api";

export const AUTH_TOKEN = "auth-token";
export const GOALS_PATH = ROOT_API + "/goals";
export const REFLECTION_PATH = ROOT_API + "/reflections";
export const RESOURCES_PATH = ROOT_API + "/resources";
export const USERS_PATH = ROOT_API + "/users";
export const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": true
};
export const SUCCESS = "success";

export const DATE_OPTIONS = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute:'2-digit'};