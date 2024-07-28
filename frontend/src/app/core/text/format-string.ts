// Export FormatString function
// Format a string with parameters ({0}{1}...)
export function FormatString(entryString : string, ...replacements: string[]): string{
    return entryString.replace(/{(\d+)}/g, function(match, number) { 
        return typeof replacements[number] != 'undefined'
          ? replacements[number]
          : match
        ;
    });  
}
