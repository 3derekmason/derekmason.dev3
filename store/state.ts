import { defineStore } from "pinia";
export const useStateStore = defineStore("state", () => {
    const introPlayed = ref(false);

    const setIntroPlayed = (played: boolean) => {
        introPlayed.value = played;
    };

    return {
        introPlayed,
        setIntroPlayed,
    };
});