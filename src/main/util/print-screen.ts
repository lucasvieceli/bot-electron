import { desktopCapturer, screen } from 'electron';

export const printScreen = async () => {
    const { size, id } = screen.getPrimaryDisplay();
    const sources = await desktopCapturer.getSources({
        types: ['screen'],
        thumbnailSize: size,
    });
    const source = sources.find((s) => s.display_id === id.toString());
    return source.thumbnail.toDataURL();
};
