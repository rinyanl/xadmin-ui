export const themeText = (isDark) => {
    switch (isDark) {
        case 'light':
            return {
                50: '#fafafa',
                100: '#f5f5f5',
                200: '#eeeeee',
                300: '#e0e0e0',
                400: '#bdbdbd',
                500: '#757575',
                600: '#9e9e9e',
                700: '#616161',
                800: '#424242',
                900: '#212121',
                1000: "#3175ED",
                1100: "#EC9046"
            }
        default: 'dark'
            return {
                50: '#26292C',
                100: '#2F3337',
                200: '#26292C',
                300: '#4C5256',
                400: '#555C62',
                500: '#5F666D',
                600: '#555C62',
                700: '#717A83',
                800: '#D4D6D9',
                900: '#E9EBEC',
                1000: "#3175ED",
                1100: "#EC9046"

            }
    }
}

export const themeBg = (isDark) => {
    switch (isDark) {
        case 'light':
            return {
                50: '#ffffff',
                100: '#f8f8f8',
                200: '#eeeeee',
                300: '#e0e0e0',
                400: '#bdbdbd',
                500: '#f5f7fb',
                900: '#1A1C1E',

            }
        default: 'dark'
            return {
                50: '#1A1C1E',
                100: '#111315',
                200: '#272A30',
                300: '#343A41',
                400: '#282A2E',
                500: '#212426',
                900: '#ffffff',

            }
    }
}
