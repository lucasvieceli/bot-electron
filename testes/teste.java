Window getSelectedWindow(Window[] windows) {
    Window result = null;
    for (int i = 0; i < windows.length; i++) {
        Window window = windows[i];
        if (window.isActive()) {
            result = window;
        } else {
            Window[] ownedWindows = window.getOwnedWindows();
            if (ownedWindows != null) {
                result = getSelectedWindow(ownedWindows);
            }
        }
    }
    return result;
}