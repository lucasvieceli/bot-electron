browser=$(lsappinfo metainfo | grep -E -o 'Safari|Google Chrome' | head -1)
[[ "$browser" = "Safari" ]] && syntax="current" || syntax="active"

script="tell app \"$browser\" to tell ¬
        (a reference to the front window) to tell ¬
        (a reference to its $syntax tab)

        if not (it exists) then return \"\"
        \"[\" & its name & \"](\" & its URL & \")\"
end tell"

[[ -n "$browser" ]] && osascript <<< "$script" || echo ""