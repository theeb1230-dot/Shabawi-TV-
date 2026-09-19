const fs = require('fs-extra');
fs.ensureDirSync('generated/compose');
const content = `
package com.plyr.nativeplayer
object PlyrTheme {
    const val CONTROL_RADIUS = 4
    const val CONTROL_PADDING = 10
}
`;
fs.writeFileSync('generated/compose/PlyrTheme.kt', content);
console.log('Compose generated');
