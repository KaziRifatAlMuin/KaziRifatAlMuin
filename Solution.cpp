#include <bits/stdc++.h>
using namespace std;
#define FAST ios_base::sync_with_stdio(false); cin.tie(NULL)
typedef long long int ll;

void test() 
{
  #ifndef ONLINE_JUDGE
	freopen("input.txt", "r", stdin);
	freopen("output.txt", "w", stdout);
  #endif
}
 
void solve();
int algo(int i, int j);

int main()
{
    FAST;
    //test();
    int t = 1, case_number = 1;
    //cin >> t;
    while(t--)
    {
        //cout << "Case " << case_number++ << ": ";
        solve();
    }
    return 0;
}

void solve()
{
    string s1,s2,s3;
    cin>>s1>>s2>>s3;
    int i,ch[26]={0};
    for(i=0;i<s1.length();i++)
        ch[s1[i]-'A']++;
    for(i=0;i<s2.length();i++)
        ch[s2[i]-'A']++;
    for(i=0;i<s3.length();i++)
        ch[s3[i]-'A']--;
    for(i=0;i<26;i++){
        if(ch[i]!=0){
            cout<<"NO\n";
            return;
        }
    }
    cout<<"YES\n";
} 

