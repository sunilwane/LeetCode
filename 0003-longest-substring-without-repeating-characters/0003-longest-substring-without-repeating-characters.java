class Solution {
    public int lengthOfLongestSubstring(String s) {
         Map<Character, Integer> charIndexMap = new HashMap<>();
        int start = 0, maxLength = 0;

        for (int end = 0; end < s.length(); end++) {
            if (charIndexMap.containsKey(s.charAt(end))) {
                start = Math.max(start, charIndexMap.get(s.charAt(end)) + 1);
            }
            charIndexMap.put(s.charAt(end), end);
            maxLength = Math.max(maxLength, end - start + 1);
        }

        return maxLength;

    }
}