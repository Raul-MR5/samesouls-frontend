/* eslint-disable no-template-curly-in-string */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app/shared/guards/auth.guard';
import { LanguagesModule } from '@app/shared/modules/languages.module';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  MonacoEditorModule,
  NgxMonacoEditorConfig,
  NGX_MONACO_EDITOR_CONFIG,
} from 'ngx-monaco-editor-v2';
import { ButtonModule } from 'primeng/button';
import { LogComponent } from './log.component';

const routes: Routes = [
  {
    path: '',
    component: LogComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full',
  },
];

export function myMonacoLoad() {
  (window as any).monaco.languages.register({ id: 'log' });

  // Register a tokens provider for the language
  (window as any).monaco.languages.setMonarchTokensProvider('log', {
    tokenizer: {
      root: [
        [/DEBUG/, 'debug'],
        [/ERROR/, 'error'],
        [/INFO/, 'info'],
        [/WARN/, 'warn'],
        [/\d\d\d\d-\d\d-\d\d \d\d:\d\d:\d\d\.\d\d\d/, 'date'],
      ],
    },
  });

  (window as any).monaco.editor.defineTheme('log-dark', {
    base: 'vs',
    inherit: true,
    rules: [
      { token: 'debug', foreground: '3b8c01', fontStyle: 'bold' },
      { token: 'info', foreground: '4fc5f7', fontStyle: 'bold' },
      { token: 'error', foreground: 'f54242', fontStyle: 'bold' },
      { token: 'warn', foreground: 'b6bd00', fontStyle: 'bold' },
      { token: 'date', foreground: 'facfac', fontStyle: 'bold' },
    ],
    colors: {
      'editor.foreground': '#c9c6d4',
      'editor.background': '#1e1e1e',
      'editorCursor.foreground': '#264f78',
      'editor.lineHighlightBackground': '#264f78',
      'editorLineNumber.foreground': '#c9c6d4',
      'editor.selectionBackground': '#264f78',
      'editor.inactiveSelectionBackground': '#264f78',
    },
  });

  (window as any).monaco.languages.registerCompletionItemProvider('log', {
    provideCompletionItems: () => [
      {
        label: 'simpleText',
        kind: (window as any).monaco.languages.CompletionItemKind.Text,
      },
      {
        label: 'testing',
        kind: (window as any).monaco.languages.CompletionItemKind.Keyword,
        insertText: {
          value: 'testing(${1:condition})',
        },
      },
      {
        label: 'ifelse',
        kind: (window as any).monaco.languages.CompletionItemKind.Snippet,
        insertText: {
          value: ['if (${1:condition}) {', '\t$0', '} else {', '\t', '}'].join('\n'),
        },
        documentation: 'If-Else Statement',
      },
    ],
  });
}

const monacoConfig: NgxMonacoEditorConfig = {
  onMonacoLoad: myMonacoLoad,
};

@NgModule({
  declarations: [LogComponent],
  imports: [
    CommonModule,
    FormsModule,
    MonacoEditorModule.forRoot(monacoConfig),
    RouterModule.forChild(routes),
    ButtonModule,
    LanguagesModule,
  ],
  providers: [{ provide: NGX_MONACO_EDITOR_CONFIG, useValue: monacoConfig }],
})
export class LogModule {}
