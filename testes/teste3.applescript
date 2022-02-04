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
        set window_list to every window # get the windows
            
            
         repeat with the_window in window_list # for every window
              #   set tab_list to every tab in the_window
                 set id_window to id in the_window
                 set the_title to the title of tab in the_window


                 #repeat with the_tab in tab_list # for every tab
                         #set the_url to the URL of the_tab 
                         #set the_title to the title of the_tab 
                         #set the_id to the id of the_tab 
                   
                         
                         set end of theList to the_title & "|||" & id_window
                        # if the id_window = 56 then

                               
                                #tell application "System Events" to tell the_window
                                #        set frontmost to true
                                #end tell
                        # end if
                 #end repeat
         end repeat
 
#          set the_url to the URL of active tab of front window # grab the URL
#    set the_title to the URL of active tab of front window # grab the title
#          set titleString to titleString & "Active: " & the_url & " - " & the_title & "\n" # concatenate
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