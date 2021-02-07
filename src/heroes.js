import { createSelector } from "reselect";
import newHeroes from "./newHeroes.json";

// action types
const DATA_LOAD = "DATA_LOAD";
const HERO_UPDATE = "HERO_UPDATE";

// action creators
const loadData = (squadData) => ({
  type: DATA_LOAD,
  payload: squadData,
});

const updateHero = (heroId, value) => ({
  type: HERO_UPDATE,
  heroId,
  value,
});

export const actions = {
  loadData,
  updateHero,
};

let initialState = {
  squadData: {},
};

// reducers
export const heroReducer = (state = initialState, action) => {
  switch (action.type) {
    case DATA_LOAD:
      // merge API data with custom data
      const mergedData = {
        ...action.payload,
        members: [...action.payload.members, ...newHeroes],
      };
      // add quantity and id properties
      // TODO: move to saga if time allows
      const heroesAsProducts = {
        ...mergedData,
        members: mergedData.members.map((hero, index) => ({
          ...hero,
          id: index,
          quantity: 0,
        })),
      };

      return {
        ...state,
        squadData: heroesAsProducts,
      };

    case HERO_UPDATE:
      const { heroId, value } = action;
      const data = { ...state.squadData };
      const hero = data.members.find((hero) => hero.id === heroId);

      const newQuantity =
        hero.quantity + value < 0 || hero.quantity + value > 10
          ? hero.quantity
          : hero.quantity + value;

      // remove any leading zeros
      const trimmedQuantity = String(newQuantity).replace(/^0+/, "");
      // set back to type Number and change value
      hero.quantity = Number(trimmedQuantity);

      return {
        ...state,
        squadData: data,
      };

    default:
      return state;
  }
};

// selectors
const getSquadData = (state) => state.heroes.squadData;
const getHeroes = createSelector(getSquadData, (data) => data.members || []);

export const selectors = {
  getSquadData,
  getHeroes,
};
