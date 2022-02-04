set myURLs to {"https://www.google.com", ¬
    "https://www.news.google.com", ¬
    "https://apple.stackexchange.com"}

set myProfiles to {"Pessoa 1", "teste"}

repeat with aProfile in myProfiles
    do shell script "open -na 'Google Chrome' --args --profile-directory=" & aProfile's quoted form
    delay 1
    tell application "Google Chrome"
        activate
        tell front window
            set URL of active tab to first item of myURLs
            delay 0.5
            repeat with i from 2 to count of myURLs
                make new tab at after (get active tab) with properties {URL:item i of myURLs}
                delay 0.5
            end repeat
            set active tab index to 1
        end tell
    end tell
    delay 1
end repeat 