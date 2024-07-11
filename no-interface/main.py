import pandas as pd
from bs4 import BeautifulSoup

# Load the HTML files
with open("/Users/wongenxin/Downloads/instagram-enxinwww-2024-06-11-puXYpYl2/connections/followers_and_following/followers_1.html", "r") as file:
    followers_html = file.read()

with open("/Users/wongenxin/Downloads/instagram-enxinwww-2024-06-11-puXYpYl2/connections/followers_and_following/following.html", "r") as file:
    following_html = file.read()

# Parse the HTML files with BeautifulSoup
followers_soup = BeautifulSoup(followers_html, "html.parser")
following_soup = BeautifulSoup(following_html, "html.parser")

# Extract followers
followers = [a.text for a in followers_soup.find_all('a') if 'href' in a.attrs]

# Extract following
following = [a.text for a in following_soup.find_all('a') if 'href' in a.attrs]

# Convert to DataFrames
followers_df = pd.DataFrame(followers, columns=["Username"])
following_df = pd.DataFrame(following, columns=["Username"])

# Find accounts that you follow but are not following you back
not_following_back_df = following_df[~following_df["Username"].isin(followers_df["Username"])]

# Display the DataFrame
print("Accounts Not Following Back:")
print(not_following_back_df)