export const PROGRAMS_FAVORITES_TAB_NAME = "favorites";
export const PROGRAMS_EXPLORE_TAB_NAME = "";
export const PROGRAM_SLUG_URL_PARAM_NAME = "programSlugUrl";

export const PROGRAMS_ROUTE = "/invest/programs";
export const PROGRAM_DETAILS_ROUTE = `${PROGRAMS_ROUTE}/:${PROGRAM_SLUG_URL_PARAM_NAME}`;
export const PROGRAM_DETAILS_FOLDER_ROUTE = `${PROGRAMS_ROUTE}/[id]`;
export const PROGRAM_SETTINGS = `settings`;
export const PROGRAM_SETTINGS_FOLDER_ROUTE = `${PROGRAMS_ROUTE}/[id]/${PROGRAM_SETTINGS}`;
export const PROGRAM_BANNERS = "banners";
export const PROGRAM_BANNERS_ROUTE = `${PROGRAM_DETAILS_ROUTE}/${PROGRAM_BANNERS}`;
export const PROGRAM_BANNERS_FOLDER_ROUTE = `${PROGRAM_DETAILS_FOLDER_ROUTE}/${PROGRAM_BANNERS}`;

export const FACETS = "facets";
export const PROGRAMS_FACET_ROUTE = `${PROGRAMS_ROUTE}/${FACETS}/:${PROGRAM_SLUG_URL_PARAM_NAME}`;
export const PROGRAMS_FACET_FOLDER_ROUTE = `${PROGRAMS_ROUTE}/${FACETS}/[id]`;
export const PROGRAMS_TAB_ROUTE = `${PROGRAMS_ROUTE}/:tab`;

export const PROGRAM_BANNER_ROUTE = `/banners/programs/:${PROGRAM_SLUG_URL_PARAM_NAME}/250x250.png`;
