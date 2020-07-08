## Analysis of the previous iteration

When adding comments to the components a few bugs were found and fixed. Further refactoring was also done as a result. I have reached a point where I am quite happy with how the code is organized.
A few things were done to better the UX, such as adding lazy loading, changing to a more compact view on large screens and the addition of some transitions. More tests were added. There is an issue with the performance of the playlist loading which will be addressed this week (note: after testing, this turned out to be an issue only on Firefox mobile and could be ignored).

## Time log

| Requirement              | Task                                        | Status      | Estimated time(h) | Actual time(h) |
| ------------------------ | ------------------------------------------- | ----------- | ----------------- | -------------- |
| 18 - Documentation       | Readme on how to set up the project locally | In progress | 1                 | 1              |
| 18 - Documentation       | Document test cases                         | Complete    | 2                 | 3              |
|                          | Perform user tests                          | Complete    | 2                 | 2              |
| 2 - Generate playlist    | Ignore seeds with popularity less than 0    | Complete    | 2                 | 0.5            |
| 20 - Session settings    | Save session to localstorage                | Complete    | 2                 | 1              |
| 20 - Session settings    | Load session from localstorage              | Complete    | 2                 | 1              |
| 14 - Reset settings      | Reset button                                | Complete    | 1                 | 2.5            |
| 23 - Contact information | Footer                                      | Complete    | 1                 | 2              |
| 12 - Add artist(s)       | Chip avatars                                | Complete    | 1                 | 0.5            |
| 2 - Generate playlist    | Fix performance issue with list             | Complete    | 2                 | 3              |
| 16 - Automated tests     | Tests for rendering                         | In progress | 2                 | 1              |
| 9 - Song preview         | Playback context                            | Complete    | 2                 | 2              |
|                          |                                             | Sum         | 20                | 19.5           |
|                          |                                             | Total       |                   | 179            |
