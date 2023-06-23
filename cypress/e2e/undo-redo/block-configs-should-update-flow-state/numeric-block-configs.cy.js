describe('Completely configure numeric block and apply undo/redo to changes', () => {
    beforeEach(() => {
    cy.createFlow({
    label: 'Undo/Redo numeric block configs ',
    })
})
    
    
    it('should configure and test the block', () => {
        const blockConfigs = {
            label: 'your age',
            name: {
                beforeEdit: 'your_age',
                afterEditPostFix: '_updated',
            },
            resources: {
                ivr: ' 02_flowers_for_albert.mp3',
                sms: 'Kindly enter your age',
                ussd: 'Kindly enter your age',
            },
            values: 
            {
                minimum: 12,
                maximum: 900,
                maxiDigit: 3
             },
            tags: [
             {
                name: 'age_tag',
                }
            ]
        }
    const getStore = () => cy.window().its('store')
    const flowModuleState = () => getStore().its('state.flow')
    const flowsListState = () => flowModuleState().its('flows')
    cy.addBlock(['Content', 'Numeric Response']).then((numericBlockUuid) => {
        const firstBlockState = () => flowsListState().its('[0].blocks[0]')
        const firstResourcesState = () => flowsListState().its('[0].resources[0]')
    // ####### Block label & name
        cy.get('[data-cy="label--editor"]')
        .find('textarea')
        .type(blockConfigs.label)
        firstBlockState().its('label').should('equal', blockConfigs.label)
        firstBlockState().its('name').should('equal', blockConfigs.name.beforeEdit)
        cy.get('[data-cy="name-editor--edit-btn"]').click()
        cy.get('[data-cy="name-editor--input"]')
        .type(blockConfigs.name.afterEditPostFix)
        cy.get('[data-cy="name-editor--save-btn"]').click()
        firstBlockState().its('name')
        .should('equal', `${blockConfigs.name.beforeEdit}${blockConfigs.name.afterEditPostFix}`)

    // ####### Resource UIs
        cy.get('[data-cy="audio-library-search--btn"]').click()
        cy.contains('.dropdown-item', blockConfigs.resources.ivr).click()
        cy.get('[data-cy="SMS-resource-variant-text--editor"]')
        .find('textarea')
        .type(blockConfigs.resources.sms)
        cy.get('[data-cy="USSD-resource-variant-text--editor"]')
        .find('textarea')
        .type(blockConfigs.resources.ussd)
        firstResourcesState().its('values').should((values) => {
        expect(values).to.have.length(3)

    // the order follows how we set the flow modes from createFlow() command
        expect(values[0].value).to.equal(blockConfigs.resources.sms)
        expect(values[1].value).to.equal(blockConfigs.resources.ussd)
        expect(values[2].value).to.contains('.mp3')
    })
    
    
    //##### values & validating if the values are saved properly#####
    
        cy.get('[data-cy="Num-miniValue"]')
        .type(blockConfigs.values.minimum)
        firstBlockState().its('config.validation_minimum').should('equal', blockConfigs.values.minimum)
  
        cy.get('[data-cy="Num-maxValue"]')
        .type(blockConfigs.values.maximum)
        firstBlockState().its('config.validation_maximum').should('equal', blockConfigs.values.maximum)

        cy.get('[data-cy="Num-maxDigit"]')
        .type(blockConfigs.values.maxiDigit)
    
    
    // ###### Tags ######

        firstBlockState().its('tags').should('have.length', 0)
        cy.get('[data-cy="tag--selector"]').as('tagSelector').click()
        cy.get('@tagSelector')
        .find('input')
        .type(blockConfigs.tags[0].name)
        cy.get('@tagSelector').contains('.multiselect__option', blockConfigs.tags[0].name).click()
        firstBlockState().its('tags').should('have.length', 1)
        firstBlockState().its('tags.[0]').should('eq', blockConfigs.tags[0].name)
        cy.save()

        cy.wait(7000)

    // Undo all configurations on the block , including removing the block

        for (let i = 0; i < 12; i++) {
             cy.undo();
            } 
    // verify that the block has been removed from the builder
        cy.get(`[data-cy="block--${numericBlockUuid}"]`).should('not.exist')

        cy.wait(7000)

    // Bring back the block including all the configuration
        for (let i = 0; i < 12; i++) {
            cy.redo();
        }
        cy.save();

        })

    }) 
    
    })
    