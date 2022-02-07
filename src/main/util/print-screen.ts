import { desktopCapturer, screen } from 'electron';

export const printScreen = async () => {
    try {
        const { size } = screen.getPrimaryDisplay();
        const [source] = await desktopCapturer.getSources({
            types: ['screen'],
            thumbnailSize: size,
        });
        return source.thumbnail.toDataURL();
    } catch (e) {
        console.log('error printScreen');
        throw e;
    }
};
