class Solution {
    public int lengthOfLongestSubstring(String s) {
         Map<Character, Integer> charIndexMap = new HashMap<>();
        int start = 0, maxLength = 0;

        for (int end = 0; end < s.length(); end++) {
            if (charIndexMap.containsKey(s.charAt(end))) {
                // Move the start to the right of the last occurrence
                start = Math.max(start, charIndexMap.get(s.charAt(end)) + 1);
            }

            // Update the last seen index of the current character
            charIndexMap.put(s.charAt(end), end);
            // Calculate the maximum length
            maxLength = Math.max(maxLength, end - start + 1);
        }

        return maxLength;

    }
}