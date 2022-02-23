import { BrowserWindow, desktopCapturer, screen } from 'electron';
import { GameLoop } from '../service/game-loop.service';

export const printScreen = async () => {
    try {
        // const { size } = screen.getPrimaryDisplay();
        // const [source] = await desktopCapturer.getSources({
        //     types: ['screen'],
        //     thumbnailSize: size,
        // });
        // return source.thumbnail.toDataURL();
        const gameLoop = GameLoop.getInstance();
        if (!gameLoop.browserActive) return '';
        const capture = await gameLoop.browserActive.capturePage();

        return capture.toDataURL();
    } catch (e) {
        console.log('error printScreen');
        throw e;
    }
};
