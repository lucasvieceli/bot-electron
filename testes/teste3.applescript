# property nil : ""

# set [currentTabTitle, currentTabUrl, idTab] to [nil, nil, nil]

# set cmd to "lsappinfo metainfo | grep -E -o 'Safari|Google Chrome|Firefox' | head -2"
# set frontmostBrowser to do shell script cmd

# if the frontmostBrowser = "" then return nil

# display dialog(frontmostBrowser)

# repeat with the_window in frontmostBrowser 
#     if the the_window = "Google Chrome" then

#         tell application "Google Chrome" to tell ¬
#             (a reference to the front window) to tell ¬
#             (a reference to its active tab)

#             if not (it exists) then return nil
#             set currentTabTitle to its title
#             set currentTabUrl to its URL
#             set idTab to its ID
        
#         end tell

#     else if the the_window = "Safari" then

#         tell application "Safari" to tell ¬
#             (a reference to the front document)

#             if not (it exists) then return nil
#             set currentTabTitle to its name
#             set currentTabUrl to its URL
#         end tell

#     else if the the_window = "Firefox" then

#         tell application "Firefox" to tell ¬
#             (a reference to the front document)

#             if not (it exists) then return nil
#             set currentTabTitle to its name
#             set currentTabUrl to its URL
#         end tell

#     end if
#     display dialog(the_window)
# end repeat
# return "[" & currentTabTitle & "](" & currentTabUrl & ")" & " ID " & idTab


# tell application "System Events"
#  set frontmost of the first process whose unix id is 6076 to true
# end tell


# 222222
# property nil : ""
# tell application "System Events"
#     # set {ProcessList, pidList} to the {name, unix id}  of every process

    
#     set theList to {}

#    if "Google Chrome" is in ProcessList then
#         tell application "Google Chrome" to tell ¬
#             (a reference to the front window) to tell ¬
#             (a reference to its active tab)
       
# return pidList
#             if not (it exists) then return nil
     
#            set end of theList to name & "|||" & ID
           
           
        

#         #    set cmd to "osascript -e 'tell application \"Google Chrome\" to activate'"
#         #    to do shell script cmd

#         end tell

#     end if

    
# end tell

# return theList




# tell application "System Events"
#  set frontmost of the first process whose unix id is 872 to true
# end tell


 set theList to {}
 tell application "Google Chrome"
        set window_list to every window

        repeat with the_window in window_list # for every window
                tell application "System Events"
                        set frontApp to the_window
                        set frontAppName to name of frontApp
                        set idWindow to id in the_window
                end tell
                set end of theList to {frontAppName, idWindow}
         end repeat
 end tell

return theList




# da foco
# tell application "System Events"
#  set frontmost of the first process whose unix id is 6076 to true

 #tell application "System Events" to tell process "Google Chrome"
                             #   set frontmost to true
                               # end tell


#da foco em uma aba
#set active tab index of front window to 28



# tell application "System Events"
#     set theList to {}

#     repeat with theProcess in (every process)
#         set {procesList, pidList} to the {name, unix id} of theProcess


#         if "Google Chrome" is in procesList then
#             tell application "Google Chrome" to tell ¬
#                 (a reference to the front window) to tell ¬
#                 (a reference to the active tab)

#                 if not (it exists) then return nil
        
#             set end of theList to name & "|||" & pidList & "|||" & ID
            
#             end tell
#         end if

#     end repeat
# end tell
# end tell