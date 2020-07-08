## Analysis of the previous iteration

Last iteration was spent focusing on building authorization functionality for the application. Since Spotify log in is not integrated into firebase I had to research on how to go about it. I have not built anything similar in the past so it took longer than I expected. I have learnt about cookies, and how Firebase Functions work. I ran into some problems while trying to set up a development environment for Firebase functions. At the end of the week I am able to log in through Spotify, save the authorization tokens in cookies, and use them to call the Spotify API to query data through the application.

## Time log

| Requirement            | Task                                        | Status      | Estimated time(h) | Actual time(h) |
| ---------------------- | ------------------------------------------- | ----------- | ----------------- | -------------- |
| 1 - Log in             | Create authorization context component      | Complete    | 1                 | 0.5            |
| 1 - Log in             | Use refresh token to get a new access token | In progress | 2                 | 7              |
| 5 - Add songs          | Search for songs through Spotify API        | In progress | 3                 | 4              |
| 5 - Add songs          | Save songs to search with                   | Incomplete  | 2                 | 1              |
| 2 - Generate playlists | Generate playlist from selected song        | In progress | 2                 | 1              |
| 6 - Playlist view      | Playlist component                          | Incomplete  | 3                 | -              |
| -                      | Make wireframe, plan layout                 | Complete    | 1                 | 1              |
| 7 - Settings           | Settings context                            | Complete    | 1                 | 1              |
| 7 - Settings           | Settings component                          | Incomplete  | 1                 | -              |
| 1 - Log in             | Watch youtube tutorial on express           | Complete    | 1                 | 1              |
|                        |                                             | Sum         | 17                | 19.5           |
|                        |                                             | Total       |                   | 75.5           |
