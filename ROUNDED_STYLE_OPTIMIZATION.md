# Rounded Style Optimization - Better Approach

## Issue
Previously, rounded corners were applied individually to the first and last `th` elements:
```jsx
<th className="p-4 w-12 rounded-tl-lg"> <!-- First column -->
<th className="p-4 text-left text-gray-700 font-medium rounded-tr-lg"> <!-- Last column -->
```

## Better Solution ✅
Apply rounded style directly to the `thead` element:
```jsx
<thead className="bg-blue-200 rounded-t-lg">
```

## Benefits of This Approach

### 1. **Cleaner Code**
- Single rounded class instead of multiple individual classes
- Less repetitive styling
- Easier to maintain

### 2. **More Semantic**
- Rounded corners are applied to the container (thead) not individual cells
- More logical CSS architecture
- Follows proper HTML/CSS practices

### 3. **Consistent Results**
- Ensures perfect rounded corners regardless of number of columns
- No need to identify first/last columns manually
- Works automatically with dynamic columns

## Changes Made

### CPMK Table:
**Before:**
```jsx
<thead className="bg-blue-200">
    <tr>
        <th className="p-4 w-12 rounded-tl-lg"> <!-- Individual styling -->
        <th className="p-4 text-left text-gray-700 font-medium">Kode</th>
        <th className="p-4 text-left text-gray-700 font-medium">Deskripsi</th>
        <th className="p-4 text-left text-gray-700 font-medium rounded-tr-lg">Ubah Data</th> <!-- Individual styling -->
    </tr>
</thead>
```

**After:**
```jsx
<thead className="bg-blue-200 rounded-t-lg"> <!-- Single styling -->
    <tr>
        <th className="p-4 w-12"> <!-- Clean -->
        <th className="p-4 text-left text-gray-700 font-medium">Kode</th>
        <th className="p-4 text-left text-gray-700 font-medium">Deskripsi</th>
        <th className="p-4 text-left text-gray-700 font-medium">Ubah Data</th> <!-- Clean -->
    </tr>
</thead>
```

### Kelas Table:
**Before:**
```jsx
<thead className="bg-blue-200">
    <tr>
        <th className="p-4 w-12 rounded-tl-lg"> <!-- Individual styling -->
        <!-- ... other columns ... -->
        <th className="p-4 text-left text-gray-700 font-medium rounded-tr-lg">Aksi</th> <!-- Individual styling -->
    </tr>
</thead>
```

**After:**
```jsx
<thead className="bg-blue-200 rounded-t-lg"> <!-- Single styling -->
    <tr>
        <th className="p-4 w-12"> <!-- Clean -->
        <!-- ... other columns ... -->
        <th className="p-4 text-left text-gray-700 font-medium">Aksi</th> <!-- Clean -->
    </tr>
</thead>
```

## Result
- ✅ **Cleaner, more maintainable code**
- ✅ **Same visual result** - rounded header corners
- ✅ **Better CSS architecture** - styling at container level
- ✅ **More flexible** - works with any number of columns
- ✅ **Follows best practices** - semantic styling approach

## Files Modified
- `src/pages/admin-prodi/DetailMataKuliahProdi.jsx`
  - Updated both CPMK and Kelas table headers
  - Applied `rounded-t-lg` to `thead` elements
  - Removed individual `rounded-tl-lg` and `rounded-tr-lg` from `th` elements

This is indeed a much better and cleaner approach! 🎉
