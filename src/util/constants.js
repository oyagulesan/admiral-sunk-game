export const SIZE = 40;
export const SMALL_SIZE = 10;
export const COMPONENTS = [4,3,3,2,2,2,1,1,1,1]
export const EMPTY_BOARD = Array.from({ length: 10 }, () => {
    return Array.from({ length: 10 }, () => {
      return 0;
    });
});
