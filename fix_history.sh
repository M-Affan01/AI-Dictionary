#!/bin/bash
git filter-branch -f --env-filter '
export GIT_AUTHOR_NAME="Affan Nexor"
export GIT_AUTHOR_EMAIL="maffan2830@gmail.com"
export GIT_COMMITTER_NAME="Affan Nexor"
export GIT_COMMITTER_EMAIL="maffan2830@gmail.com"
' --tag-name-filter cat -- --branches --tags
