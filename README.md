# Difficultés rencoontrées

## Erreur FindDOMNode

Je suis tombé sur la même erreur que le développeur lors de se vidéo :<br/>
![error_findDOMNode](/screenshots/error_findDOMNode.png)
Il a corrigé la solution en retirant le mode strict. Ne souhaitant pas le retirer, je fais pas mal de recherches. Les solutions parlaient d'utiliser la référence de l'objet `useRef` ou `createRef`, mais mes différentes tentatives ont toutes étaient infructueuses.

Utilisant la version 4.11.4 de Material-UI, j'ai tenté avec la version 5.0.0-beta, mais l'erreur était toujours là...

J'ai donc pris la décision d'appliquer la même "solution" que dans la vidéo en retirant le StrictMode.